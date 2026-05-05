package com.web3.herstory.urbanflora.handler;

import com.web3.herstory.urbanflora.exception.BusinessException;
import com.web3.herstory.urbanflora.exception.WalletNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;

import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    public Result<?> handleBusiness(BusinessException e) {
        return Result.error(Result.BUSINESS_ERROR, e.getMessage());
    }

    @ExceptionHandler(WalletNotFoundException.class)
    public Result<?> handleWalletNoFound(WalletNotFoundException e) {
        return Result.error(Result.PARAM_ERROR, e.getMessage());
    }

    // 处理参数异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<?> handleValidationException(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return Result.error(Result.PARAM_ERROR, msg);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Result<?>> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException e) {
        log.warn("上传文件过大", e);
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(Result.error(Result.PARAM_ERROR, "上传文件过大，请压缩后重试。单文件最大 50MB，请求总大小最大 60MB。"));
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<Result<?>> handleMultipartException(MultipartException e) {
        log.warn("文件上传失败", e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Result.error(Result.PARAM_ERROR, "文件上传失败，请检查文件大小和请求格式。"));
    }

    // 处理所有未知异常
    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        // 打印日志（很重要）
        log.error("系统异常", e);
        return Result.error("系统异常，请稍后再试");
    }
}
