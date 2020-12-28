namespace DatingApp
{
    public class Connection
    {
        public Connection()
        {
        }

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            userName = username;
        }

        public string ConnectionId { get; set; }
        public string userName { get; set; }
    }
}