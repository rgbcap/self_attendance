async function appendData() {
  try {
    const position = await getCurrentPosition();
    const jsonData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: new Date().toISOString()
    };

    const response = await fetch('/appendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });

    if (response.ok) {
      console.log('Data appended successfully');
    } else {
      console.error('Failed to append data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser'));
    }
  });
}