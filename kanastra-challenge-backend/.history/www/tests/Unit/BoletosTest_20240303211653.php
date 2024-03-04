<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\BoletosFilesController;
use App\Models\BoletosFile;
use Illuminate\Http\JsonResponse;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Storage;

class BoletosTest extends TestCase
{

    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

    public function test_check_data_structure(): void
    {
        dd("oi");
        $controller = new BoletosFilesController(new BoletosFile());
        $response = $controller->index();

        $this->assertInstanceOf(JsonResponse::class, $response);

        $responseData = $response->getData(true);
        dd($responseData);
        $this->assertArrayHasKey('data', $responseData);
        $this->assertArrayHasKey('meta', $responseData);
    }
}
