import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ProductToTransferService } from '../services/product-to-transfer.service';
import { CreateProductToTransferDto } from '../dtos/CreateProductToTransfer.dto';
import { UpdateProductToTransferDto } from '../dtos/UpdateProductToTransfer.sto';

@Controller('product-to-transfer')
export class ProductToTransferController {
    constructor (private productToTransferService: ProductToTransferService) {}

    @Get('product')
    async fetchAll(@Req() req) {
        const warehouseId = req.user.sub;
        return this.productToTransferService.fetch(warehouseId);
    }

    @Get('product/:ref')
    async getByProductRef(@Param('ref', ParseIntPipe) ref: number) {
        return this.productToTransferService.findByProductRef(ref);
    }

    @Post('import-export')
    import(@Req() req, @Body() createProductToTransferDto: CreateProductToTransferDto) {
        const warehouseId = req.user.sub;
        return this.productToTransferService.create(
            warehouseId,
            createProductToTransferDto.ref,
            createProductToTransferDto.quantity,
            createProductToTransferDto.totalPrice,
            createProductToTransferDto.type,
        );
    }

    @Patch('update/:id') 
    updateProduct(
        @Param('id') id: number,
        @Body() updateProductToTransferDto: UpdateProductToTransferDto
    ) {
        return this.productToTransferService.update(id, updateProductToTransferDto);
    }

    @Delete('delete/:id')
    async deleteProductToTransfer(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productToTransferService.deleteById(id);
    }

}
