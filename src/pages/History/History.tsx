import { HistoryContainer, HistoryList, Status } from './History.styles.ts';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext.tsx';
import { formatDistanceToNow, getTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles
              .sort((a, b) => getTime(b.startDate) - getTime(a.startDate))
              .map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>
                      {formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status $statusColor="green">Concluído</Status>
                      )}
                      {cycle.interruptedDate && (
                        <Status $statusColor="red">Interrompido</Status>
                      )}
                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status $statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
