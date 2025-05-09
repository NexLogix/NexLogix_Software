<?php
namespace App\Models\Interfaces\Envios;
interface IEnviosUseCase
{
    public function handleCreateEnvio(array $data): array;
    public function handleUpdateEnvio(int $id, array $data): array;
    public function handleUpdateSpecificSection(int $id, array $data): array;
}
