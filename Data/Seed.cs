namespace DatingApp.Data
{
    public class Seed
    {
        public static void UsersPasswords(DataContext context)
        {
            var users = context.Users;

            foreach(var user in users)
            {
                context.Users.Update(user);
            }
        }
    }
}
