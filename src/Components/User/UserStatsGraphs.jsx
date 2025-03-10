import React from 'react';
import styles from './UserStatsGraphs.module.css';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

function UserStatsGraphs({ data }) {
  const [grap, setGrap] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: +item.acessos,
      };
    });
    setTotal(data.map(({ acessos }) => +acessos).reduce((a, b) => a + b, 0));
    setGrap(graphData);
  }, [data]);

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={`${styles.total} ${styles.gItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.gItem}`}>
        <VictoryPie
          data={grap}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.gItem}`}>
        <VictoryChart>
          <VictoryBar data={grap} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
}

export default UserStatsGraphs;
