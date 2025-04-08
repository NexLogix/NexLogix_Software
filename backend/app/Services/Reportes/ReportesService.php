<?php
namespace App\Services\Reportes;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use App\Models\Reportes;
class ReportesService
{
    // GET

    public function getAll()
    {
        try {
            $reportes = Reportes::all();

            if ($reportes->isEmpty()) {
                throw new ModelNotFoundException('No hay Rerportes!');
            }

            return response()->json([
                'message' => 'Lista de Reportes',
                'data' => $reportes,
                'status' => 200,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => $e->getMessage(),
                "status" => 404
            ], 404);

        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }
}
