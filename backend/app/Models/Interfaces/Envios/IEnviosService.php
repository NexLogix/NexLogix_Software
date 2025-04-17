<?php
namespace App\Models\Interfaces\Envios;

interface IEnviosService
{
    public function getAllEnvios(): array;
    public function getEnvioById(int $id): array;
    public function createEnvio(array $data): array;
    public function updateSpecificFields(int $id, array $data): array;
    public function deleteEnvio(int $id): array;
}

