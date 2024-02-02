import { HistoryContainer, HistoryList, Status } from './History.styles.ts';

const tasks = [
  {
    task: 'Tarefa',
    duration: '20 minutos',
    start: 'Há 2 meses',
    status: 'Concluído',
  },
];

export function History() {
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
            {tasks.map((item) => {
              return (
                <tr>
                  <td>{item.task}</td>
                  <td>{item.duration}</td>
                  <td>{item.start}</td>
                  <td>
                    <Status $statusColor="green">{item.status}</Status>
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
