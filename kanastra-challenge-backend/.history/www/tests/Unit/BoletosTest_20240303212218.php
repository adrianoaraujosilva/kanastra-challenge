<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\BoletosFilesController;
use App\Models\BoletosFile;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;

class BoletosTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
    }

    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

    // public function test_check_data_structure(): void
    // {
    //     $controller = new BoletosFilesController(new BoletosFile());
    //     $response = $controller->index();

    //     $this->assertInstanceOf(JsonResponse::class, $response);

    //     $responseData = $response->getData(true);
    //     dd($responseData);
    //     $this->assertArrayHasKey('data', $responseData);
    //     $this->assertArrayHasKey('meta', $responseData);
    // }

    public function testStoreValidationFails()
    {
        $controller = new BoletosFilesController(new BoletosFile());
        $request = new Request();

        $this->expectException(ValidationException::class);

        $controller->store($request);
    }
}
