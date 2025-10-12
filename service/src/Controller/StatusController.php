<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class StatusController extends AbstractController
{
    #[Route('/status', name: 'app_status')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/StatusController.php',
        ]);
    }

    #[Route('/health', name: 'app_health')]
    public function health(): JsonResponse
    {
        return $this->json([
            'status' => 'ok',
            'service' => 'symphony'
        ]);
    }

    #[Route('/stats/summary', name: 'app_stats_summary')]
    public function summary(): JsonResponse
    {
       return $this->json([
            'ok' => true,
        ]);
    } 
}
