import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState } from 'react';

import { HomeContainer } from './Home.styles.ts';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import { TimerButton } from './components/TimerButton';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  markCurrentCycleAsInterrupted: () => void;
  clearActiveCycle: () => void;
  updateAmountSecondsPassed: (newAmount: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? {
              ...cycle,
              finishedDate: new Date(),
            }
          : cycle,
      ),
    );
  };

  const markCurrentCycleAsInterrupted = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? {
              ...cycle,
              interruptedDate: new Date(),
            }
          : cycle,
      ),
    );
  };

  const clearActiveCycle = () => setActiveCycleId(null);

  const updateAmountSecondsPassed = (newAmount: number) =>
    setAmountSecondsPassed(newAmount);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            markCurrentCycleAsInterrupted,
            updateAmountSecondsPassed,
            clearActiveCycle,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />

            <Countdown />

            <TimerButton />
          </FormProvider>
        </CyclesContext.Provider>
      </form>
    </HomeContainer>
  );
}
