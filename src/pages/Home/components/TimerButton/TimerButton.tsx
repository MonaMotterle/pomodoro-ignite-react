import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext.tsx';
import {
  StartCountdownButton,
  StopCountdownButton,
} from './TimerButton.styles.ts';
import { useFormContext } from 'react-hook-form';

export const TimerButton = () => {
  const { activeCycle, interruptCurrentCycle } = useContext(CyclesContext);
  const { watch, reset } = useFormContext();

  const task = watch('task');
  const isSubmitDisable = !task;

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle();

    reset();
  }

  if (activeCycle)
    return (
      <StopCountdownButton onClick={handleInterruptCurrentCycle} type="button">
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
