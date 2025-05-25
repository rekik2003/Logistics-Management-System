import {
    EntitySubscriberInterface,
    EventSubscriber,
    UpdateEvent,
  } from 'typeorm';
import { BudgetRequests } from '../BudgetRequests';
import { Transporter } from 'src/transporter/entity/Transporter';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';

  @EventSubscriber()
  export class BudgetRequestSubscriber implements EntitySubscriberInterface<BudgetRequests> {
  
    listenTo() {
      return BudgetRequests;
    }
  
    async afterUpdate(event: UpdateEvent<BudgetRequests>) {
      const updatedBudgetRequest = event.entity as BudgetRequests;
      
      if (updatedBudgetRequest.status === 'Accepted' || updatedBudgetRequest.status === 'Modified') {
        const transporter = updatedBudgetRequest.transporter;
        const warehouse = updatedBudgetRequest.warehouse;
  
        if (transporter) {
          transporter.budget += updatedBudgetRequest.cost;
          await event.manager.getRepository(Transporter).save(transporter);
        } 
        else if (warehouse) {
          warehouse.budget += updatedBudgetRequest.cost;
          await event.manager.getRepository(Warehouse).save(warehouse);
        }
      }
    }
  }
  