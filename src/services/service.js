const Server = () => {

    const toServer = async (type, postData) => {
        try {
            const response = await fetch(`http://localhost:8888/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: postData }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
        return false
    };

    const fromServer = async () => {
        try {
            const response = await fetch('http://localhost:8888/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data from server:', error);
            return [];
        }
    };

    return {
        toServer,
        fromServer
    };
};

export default Server;
