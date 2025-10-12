<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\PaytrackrApiClient;

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
    # appelle ton service fetchTransactions()
    #[Route('/stats/summary', name: 'app_stats_summary')]
    public function summary(PaytrackrApiClient $client): JsonResponse
    {
         try {
            $transactions = $client->fetchTransactions();
        } catch (\Throwable $e) {
            return new JsonResponse([
                'ok' => false,
                'error' => 'Upstream/API error',
                'detail' => $e->getMessage(),
            ], 502);
        }
        $count = count($transactions);
        $byStatus = [];
        $byCurrency = [];
        foreach ($transactions as $transaction) {
            $status = $transaction['status'];
            $currency = $transaction['currency'];
            if (!isset($byStatus[$status])) {
                $byStatus[$status] = 0;
            }
            $byStatus[$status]++;
            if (!isset($byCurrency[$currency])) {
                $byCurrency[$currency] = 0;
            }
            $byCurrency[$currency]++;
        }
        return $this->json([
            'count' => $count,
            'byStatus' => $byStatus,
            'byCurrency' => $byCurrency
        ]);
    }
}
