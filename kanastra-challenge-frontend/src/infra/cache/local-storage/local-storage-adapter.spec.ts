import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from '@/infra/cache';

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

const fakerObject = { name: "Rodolfo", age: 24};

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, fakerObject);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(fakerObject)
    );
  });

  test('should call localStorage.removeItem if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(fakerObject));
    const obj = sut.get(key);
    expect(obj).toEqual(fakerObject);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem and return empty object', () => {
    const sut = makeSut();
    const key = faker.database.column();
    jest.spyOn(localStorage, 'getItem').mockImplementationOnce(() => null);
    const obj = sut.get(key);
    expect(obj).toEqual({});
  });
});
