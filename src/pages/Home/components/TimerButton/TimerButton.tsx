import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { CyclesContext } from '../../Home.tsx';
import { useFormContext } from 'react-hook-form';
import {
  StartCountdownButton,
  StopCountdownButton,
} from './TimerButton.styles.ts';

export const TimerButton = () => {
  const {
    activeCycle,
    markCurrentCycleAsInterrupted,
    updateAmountSecondsPassed,
    clearActiveCycle,
  } = useContext(CyclesContext);
  const { watch, reset } = useFormContext();

  const task = watch('task');
  const isSubmitDisable = !task;

  function handleInterruptCycle() {
    markCurrentCycleAsInterrupted();
    updateAmountSecondsPassed(0);
    clearActiveCycle();

    reset();
  }

  if (activeCycle)
    return (
      <StopCountdownButton type="button" onClick={handleInterruptCycle}>
        <HandPalm size={24} />
        Interromper
      </StopCountdownButton>
    );

  return (
    <StartCountdownButton disabled={isSubmitDisable} type="submit">
      <Play size={24} />
      Começar
    </StartCountdownButton>
  );
};
