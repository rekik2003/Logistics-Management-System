import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateBudgetRequestDto } from 'src/budget/dto/createBudgetRequest.dto';
import { UpdateBudgetRequestDto } from 'src/budget/dto/updateBudgetRequest.dto';
import { BudgetRequestService } from 'src/budget/services/budget-request/budget-request.service';

@Controller('budget-request')
export class BudgetRequestController {
    constructor (private budgetRequestService: BudgetRequestService) {}

    @Get('fetch')
    fetchBudgetRequests() {
        return this.budgetRequestService.fetchPending();
    }

    @Get('fetchByEmployee')
    fetchByEmployee(@Req() req) {
      const employeeId = req.user.sub;
        return this.budgetRequestService.fetchByEmployee(employeeId);
    }

    @Post('create')
    addBudgetRequest(@Req() req, @Body() createBudgetRequestDto: CreateBudgetRequestDto) {
        const employeeId = req.user.sub;
        return this.budgetRequestService.create(
            employeeId,
            createBudgetRequestDto.cost,
        );
    }

    @Patch('accept/:id')
    async acceptBudgetRequest(@Param('id') id: number) {
      return this.budgetRequestService.accept(id);
    }
  
    @Patch('decline/:id')
    async declineBudgetRequest(@Param('id') id: number) {
      return this.budgetRequestService.decline(id);
    }

    @Patch('updateCost/:id')
    async updateBudgetRequest(@Param('id') id: number, @Body() updateBudgetRequestDto: { cost: number }) {
      return this.budgetRequestService.updateBudgetRequest(id, updateBudgetRequestDto);
    }
}
