<?php

namespace App\Http\Controllers\Reportes;

use App\Exceptions\ExceptionHttpMethodNotAllowed;
use App\Exceptions\ExceptionItemNotFound;
use App\Exceptions\ExceptionBadRequest;
use App\Exceptions\ExceptionServerError;
use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;
use Illuminate\Http\JsonResponse;

class GetReportesController extends Controller
{
    public function __construct( private ReportesService $reportes_service ) {}

    public function verReportes(): JsonResponse
    {
        try {
            return $this->reportes_service->getAll();
        } catch (ExceptionItemNotFound | ExceptionBadRequest | ExceptionHttpMethodNotAllowed | ExceptionServerError $e) {
            return $e->render();
        }
    }
}
