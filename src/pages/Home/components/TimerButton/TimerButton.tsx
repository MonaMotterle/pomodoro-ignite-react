import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext.tsx';
import {
  StartCountdownButton,
  StopCountdownButton,
} from './TimerButton.styles.ts';

interface TimerButtonProps {
  isSubmitDisable?: boolean;
}

export const TimerButton = ({ isSubmitDisable }: TimerButtonProps) => {
  const { activeCycle, interruptCurrentCycle } = useContext(CyclesContext);

  if (activeCycle)
    return (
      <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
