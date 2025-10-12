<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


final class PaytrackrApiClient
{
    private HttpClientInterface $http;
    private string $base;

    public function __construct(HttpClientInterface $http, string $base)
    {
        $this->http = $http;
        $this->base = rtrim($base, '/');
    }
    public function fetchTransactions(): array
    {
        $res = $this->http->request('GET', $this->base . '/transactions');

        return $res->toArray();
    }
}