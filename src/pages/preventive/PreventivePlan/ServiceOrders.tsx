

import { PreventiveCard } from '../../../components/cards/PreventiveCard';
import { ScrollContainer } from '../../../components/containers/ScrollContainer';
import { InputButton } from '../../../components/forms/InputButton';
import { PageHeader } from '../../../components/PageHeader';
import { usePages } from '../../../hooks/usePages'
import { api } from '../../../utils/trpc';


import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineClear } from 'react-icons/ai'
import { useState } from 'react';

interface type {
  week: number;
  year: number;
}

export function ServiceOrders({ week, year }: type) {

  const [nature, setNature] = useState('')
  const [machine, setMachine] = useState('')
  const [status, setStatus] = useState('todos')

  const { data } = api.preventive.getServiceOrders.useQuery({
    week,
    year,
    machine,
    nature,
    status
  })
  const machines = api.main.getMachines.useQuery()
  const natures = api.main.getNatures.useQuery()

  const { backPage } = usePages()

  return (
    <div
      className="
        w-full h-full
        px-5
      "
    >
      <InputButton
        title=''
        className="text-gray-100 bg-gray-500 ml-[-12px] mt-2"
        Icon={IoIosArrowBack}
        onClick={() => { backPage() }}
      />

      <PageHeader title={`Ordens de Serviço Preventivas - Semana ${week}, ${year}`} >
        <div
          className={`w-full h-full flex flex-row gap-1 justify-end, items-center`}
        >

          <div
            className='w-1/3 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/2 font-medium text-gray-900 indent-0"
            >Status:</label>
            <select
              className='w-full h-1/2 bg-transparent border-b border-gray-900'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="true">Concluído</option>
              <option value="false">Em Aberto</option>
            </select>
          </div>

          <div
            className='w-1/3 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/2 font-medium text-gray-900 indent-0"
            >Máquina:</label>
            <select
              className='w-full h-1/2 bg-transparent border-b border-gray-900'
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
            >
              <option value="">Todos</option>
              {machines.data?.map((entry, index) => (
                <option key={index} value={entry.id}>{entry.tag}</option>
              ))}
            </select>
          </div>



          <div
            className='w-1/3 h-full flex flex-col p-1.5'
          >
            <label
              className="w-full h-1/2 font-medium text-gray-900 indent-0"
            >Natureza:</label>
            <select
              className='w-full h-1/2 bg-transparent border-b border-gray-900'
              value={nature}
              onChange={(e) => setNature(e.target.value)}
            >
              <option value="">Todos</option>
              {natures.data?.map((entry, index) => (
                <option key={index} value={entry.id}>{entry.name}</option>
              ))}
            </select>
          </div>

          <div
            className='w-12 h-full flex flex-col p-1.5 justify-center items-end'
          >
            <InputButton
              Icon={AiOutlineClear}
              className="text-red-500 w-full text-xl hover:text-red-400"
              onClick={() => {
                console.log(status, machine, nature)
                setNature('todos')
                setMachine('todos')
                setStatus('todos')
              }}
            />
          </div>

        </div>

      </PageHeader >

      <div className="w-full h-[calc(100vh-170px)]">
        <ScrollContainer className="mt-5 h-full  rounded-md" >
          {
            data?.length === 0 ?
              <div
                className="
                  w-full h-full 
                  flex justify-center items-center
                  font-medium
                "
              >
                Nenhuma ação preventiva para esta semana!
              </div>
              : <div
                className="
                  grid grid-cols-2 xl:grid-cols-3 gap-4 p-4 
                "
              >
                {
                  data?.map((entry, index) => (
                    <PreventiveCard key={index} data={entry} />
                  ))
                }
              </div>

          }
        </ScrollContainer>
      </div>
    </div >
  )
}



