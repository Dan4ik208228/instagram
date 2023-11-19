export type PostData = {
    text: string,
    likes: number,
    ifLike: boolean,
    img: string,
    id: number
}

class Server
{
    async toServer(type: string, postData: {})
    
    {
        
        try {
            console.log(type)
            const response = await fetch(`http://localhost:8888/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
        return false
    }

    async fromServer()
    {
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
}

export default Server;

export const server = new Server();
