const UserTestChart = () => {
    // Dummy data for demonstration
    const data = {
      labels: ['User Info', 'Test Conducted'],
      datasets: [
        {
          label: 'Number of Users',
          data: [150, 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // User Info
            'rgba(54, 162, 235, 0.2)', // Test Conducted
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'User Info and Test Conducted',
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  