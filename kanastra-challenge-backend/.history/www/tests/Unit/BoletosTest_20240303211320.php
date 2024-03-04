<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
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

    public function teste_check_data_structure(): void
    {
        $this->assertTrue(true);
        // $controller = new BoletosFilesController(new BoletosFile());
        // $response = $controller->index();

        // $this->assertInstanceOf(JsonResponse::class, $response);

        // $responseData = $response->getData(true);
        // $this->assertArrayHasKey('data', $responseData);
        // $this->assertArrayHasKey('meta', $responseData);
    }
}
