<?php

namespace App\Http\Controllers\Areas;
// Importacion de Interfaces
use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Areas\AreasService;

use App\UseCases\Areas\AreasUseCase;

class AreasController extends Controller
{
    protected IAreaService $areasService;
    protected IAreaUseCase $areasUseCase;

    public function __construct(AreasService $areasService, AreasUseCase $areasUseCase)
    {
        $this->areasService = $areasService;
        $this->areasUseCase = $areasUseCase;
    }

    public function showAll()
    {
        $response = $this->areasService->getAll();
        if ($response['status'] === 200){
            
        }
    }

    public function showByID($id)
    {
        return response()->json($this->areasService->getAreaById($id));
    }

    public function createArea(Request $request)
    {
        $result = $this->areasUseCase->handleCreateArea($request->all());
        return response()->json($result, $result['status']);
    }

    public function updateArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateArea($id, $request->all());
        return response()->json($result, $result['status']);
    }

    public function updatePartialArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateSpecificSection($id, $request->all());
        return response()->json($result, $result['status']);
    }

    public function deleteArea($id)
    {
        return response()->json($this->areasService->deleteArea($id));
    }
}
