import { PagesContainer, Screen } from "../contexts/PagesContext";
import { PreventivePlan } from "../pages/preventive/PreventivePlan";
import {WeekCalendar} from '../pages/preventive/PreventivePlan/WeekCalendar'
import {ServiceOrders} from '../pages/preventive/PreventivePlan/ServiceOrders'
import { PreventiveActions } from "../pages/preventive/PreventiveActions";
import { PreventiveActionForm } from "../pages/preventive/PreventiveActionForm";

export function PreventiveRoutes() {
  return (
    <PagesContainer className="w-[100%] h-tabPage flex items-center justify-center">

      <Screen 
        name="Preventive.Plan" 
        component={PreventivePlan} 
      />

      <Screen 
        name="Preventive.Actions" 
        component={PreventiveActions} 
      />

    </PagesContainer>
  );
}

export function PreventiveOsRoutes() {
  return (
    <PagesContainer className="w-[100%] h-tabPage flex items-center justify-center">

      <Screen 
        name="Preventive.Plan.Calendar" 
        component={WeekCalendar} 
      />

      <Screen 
        name="Preventive.Plan.ServiceOrders" 
        component={ServiceOrders} 
      />

    </PagesContainer>
  );
}

export function PreventiveActionsFormRoutes() {
  return (
    <PagesContainer>
      <Screen
        name="Preventive.Actions"
        component={()=>(<></>)}
      />
      <Screen
        name="Preventive.Actions.NewActions"
        component={PreventiveActionForm}
      />
      <Screen
        name="Preventive.Actions.EditActions"
        component={PreventiveActionForm}
      />
    </PagesContainer>
  );
}
