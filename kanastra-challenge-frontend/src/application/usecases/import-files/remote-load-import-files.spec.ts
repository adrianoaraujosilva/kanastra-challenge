import { faker } from "@faker-js/faker";
import { HttpStatusCodeEnum } from "@/application/protocols/http";
import { HttpClientSpy } from "@/application/test";
import {
  AccessDeniedError,
  BadRequestError,
  UnexpectedError,
} from "@/domain/errors";
import { RemoteLoadImportFiles } from "./remote-load-import-files";
import { LoadImportFilesSuccessResponse } from "@/application/usecases/__mocks__/";
import { LoadImportFiles } from "@/domain/usecases";

type SutTypes = {
  httpClientSpy: HttpClientSpy;
  sut: RemoteLoadImportFiles;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy(
    LoadImportFilesSuccessResponse as unknown as LoadImportFiles.ApiResponse
  );
  const sut = new RemoteLoadImportFiles(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

const params = { page: 1 };

describe("RemoteLoadImportFiles", () => {
  test("should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.load(params);

    const expectUrl = url + "?page=1";
    expect(httpClientSpy.url).toBe(expectUrl);
  });

  test("should throw BadRequestError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.badRequest;

    const promise = sut.load(params);
    await expect(promise).rejects.toThrow(new BadRequestError());
  });

  test("should throw AccessDeniedError if HttpClient returns 401", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.unauthorized;

    const promise = sut.load(params);
    await expect(promise).rejects.toThrow(AccessDeniedError);
  });

  test("should throw AccessDeniedError if HttpClient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.forbidden;

    const promise = sut.load(params);
    await expect(promise).rejects.toThrow(AccessDeniedError);
  });

  test("should throw UnexpectedError if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.notFound;

    const promise = sut.load(params);
    await expect(promise).rejects.toThrow(UnexpectedError);
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.serverError;

    const promise = sut.load(params);
    await expect(promise).rejects.toThrow(UnexpectedError);
  });

  test("should return a empty object if HttpClient returns 204", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCodeEnum.noContent;

    const httpResponse = await sut.load(params);
    expect(httpResponse).toEqual({});
  });
});
