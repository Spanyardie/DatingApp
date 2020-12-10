using System.Security.Cryptography;
using System.Text;

namespace DatingApp.Data
{
    public class Seed
    {
        public static void UsersPasswords(DataContext context)
        {
            var users = context.Users;

            foreach(var user in users)
            {
                using var hmac = new HMACSHA512();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.UserName));
                user.PasswordSalt = hmac.Key;
                context.Users.Update(user);
            }
        }
    }
}
