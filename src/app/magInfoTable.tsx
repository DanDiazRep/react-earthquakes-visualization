const MagInfoTable = () => {
  return (
    <table style={{ marginTop: 15, marginBottom: 10 }}>
      <thead>
        <tr>
          <th>Magnitude</th>
          <th>Earthquake Effects</th>
          <th>Estimated Number Each Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2.5 or less</td>
          <td>Usually not felt, but can be recorded by seismograph.</td>
          <td>Millions</td>
        </tr>
        <tr>
          <td>2.5 to 5.4</td>
          <td>Often felt, but only causes minor damage.</td>
          <td>500,000</td>
        </tr>
        <tr>
          <td>5.5 to 6.0</td>
          <td>Slight damage to buildings and other structures.</td>
          <td>350</td>
        </tr>
        <tr>
          <td>6.1 to 6.9</td>
          <td>May cause a lot of damage in very populated areas.</td>
          <td>100</td>
        </tr>
        <tr>
          <td>7.0 to 7.9</td>
          <td>Major earthquake. Serious damage.</td>
          <td>10-15</td>
        </tr>
        <tr>
          <td>8.0 or greater</td>
          <td>
            Great earthquake. Can totally destroy communities near the
            epicenter.
          </td>
          <td>One every year or two</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MagInfoTable;
