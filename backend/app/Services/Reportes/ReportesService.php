<?php
namespace App\Services\Reportes;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use App\Models\Reportes;
use Illuminate\Support\Facades\Validator;
use Exception;
class ReportesService
{
    // GET
    public function getAll()
    {
        try {
            $reportes = Reportes::all();

            if ($reportes->isEmpty()) {
                throw new ModelNotFoundException('No hay Reportes!');
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

    // GET BY ID

    public function getReporteByID($id)
    {
        try {
            $reporte = Reportes::findOrFail($id);
            return response()->json([
                "message: "=> "Reporte encontrado",
                "Reporte"=> $reporte,
                "Status" => 200
            ]);
        } catch (ModelNotFoundException $e){
            return response()->json([
                "message"=> "Reporte con el ID $id, lamentablemente no ha sido encontrado!",
                "status"=> 404
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status" => 500
            ], 500);

        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }

    // POST
    public function createReporte(array $data): array
    {
        try {
            $reporte = Reportes::create([
                'tipoReporte'   => $data['tipoReporte'],
                'descripcion'   => $data['descripcion'],
                'fechaCreacion' => $data['fechaCreacion'] ?? now(),
                'idusuarios'    => $data['idusuarios']
            ]);

            return [
                'message' => 'Reporte creado correctamente',
                'data'    => $reporte,
                'status'  => 201
            ];
        } catch (QueryException $e) {
            return [
                'message' => 'Error al insertar en la base de datos',
                'details' => $e->getMessage(),
                'status'  => 500
            ];
        }
    }

    // PUT
    public function udpateReporte($id,array $data )
    {

       try {
            $reporte = Reportes::findOrFail( $id );

            $reporte->update([
                'tipoReporte' => $data['tipoReporte'],
                'descripcion' => $data['descripcion'],
                'fechaCreacion' => $data['fechaCreacion'] ?? now(),
                'idusuarios'=> $data['idusuarios']
            ]);

            return response()->json([
                'message' => 'Reporte actualizado correctamente!',
                'data' => $reporte,
                'status'=> 200
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Reporte con ID $id no encontrado",
                "status"  => 404
            ], 404);

        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error en la base de datos: " . $e->getMessage(),
                "status"  => 500
            ], 500);

        } catch (\Throwable $e) {
            return response()->json([
                "message" => "Error inesperado: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        }

    }

    // PATCH
    public function udpateSpecificPlace($request, $id): array
    {
        $validator = Validator::make($request->all(), [
            'tipoReporte'   => 'sometimes|required|string|max:150',
            'descripcion'   => 'sometimes|required|string|max:1000',
            'fechaCreacion' => 'sometimes|date_format:Y-m-d H:i:s',
            'idusuarios'    => 'sometimes|required|numeric'
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        try {
            $reporte = Reportes::findOrFail($id);
            $reporte->update($request->all());

            return [
                'message' => 'Reporte actualizado correctamente',
                'data'    => $reporte,
                'status'  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'message' => "Reporte con ID $id no encontrado",
                'status'  => 404
            ];
        } catch (QueryException $e) {
            return [
                'message' => "Error en la base de datos: " . $e->getMessage(),
                'status'  => 500
            ];
        } catch (\Exception $e) {
            return [
                'message' => "Error inesperado: " . $e->getMessage(),
                'status'  => 500
            ];
        }
    }

    // DELTE
    public function deleteReporte($id): array
    {
        try {
            // Buscamos el reporte; si no existe, se lanzará ModelNotFoundException
            $reporte = Reportes::findOrFail($id);

            // Eliminamos el reporte
            $reporte->delete();

            return [
                'message' => 'Reporte eliminado correctamente',
                'status'  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'message' => "Reporte con el ID $id no fue encontrado",
                'status'  => 404
            ];
        } catch (QueryException $e) {
            return [
                'message' => "Error de base de datos: " . $e->getMessage(),
                'status'  => 500
            ];
        } catch (Exception $e) {
            return [
                'message' => "Ocurrió un error inesperado: " . $e->getMessage(),
                'status'  => 500
            ];
        }
    }
}
