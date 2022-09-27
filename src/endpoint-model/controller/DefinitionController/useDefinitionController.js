import { useRegister } from 'endpoint-model/register/useRegister'

const useDefinitionController = ( endpointId, directive) => {

    const controller = "Sofa.DefinitionController"
    const { deviceState } = useRegister(endpointId)
    const summary = deviceState?.[controller]?.summary || {}
    const actionsCount = summary?.value?.actions_count || 0
    const conditionsCount = summary?.value?.conditions_count || 0
    const schedulesCount = summary?.value?.schedules_count || 0
    const triggersCount = summary?.value?.triggers_count || 0
    const missingDevicesCount = summary?.value?.missing_devices_count || 0
    const nextRun = summary?.value?.next_run || null

    const countData = {   "actions_count": actionsCount, 
                    "conditions_count": conditionsCount, 
                    "schedules_count": schedulesCount, 
                    "triggers_count": triggersCount, 
                    "missing_devices_count": missingDevicesCount 
                }

    return { countData, nextRun, summary, actionsCount, conditionsCount, schedulesCount, triggersCount }

}

export default useDefinitionController
