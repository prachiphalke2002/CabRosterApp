using CabRosterApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CabRosterApp.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger)
        {
            var email = "admin@gmail.com";
            var password = "Admin@12345";

            try
            {
                var user = await userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    // Create the admin user if not exists
                    user = new ApplicationUser
                    {
                        UserName = email,
                        Email = email,
                        Name = "Admin",
                        MobileNumber = "1234567890",
                        IsApproved = true  // Admin is auto-approved
                    };

                    var result = await userManager.CreateAsync(user, password);
                    if (result.Succeeded)
                    {
                        // Add Admin role
                        var roleExists = await roleManager.RoleExistsAsync("Admin");
                        if (!roleExists)
                        {
                            await roleManager.CreateAsync(new IdentityRole("Admin"));
                        }

                        await userManager.AddToRoleAsync(user, "Admin");
                        logger.LogInformation($"Admin user created successfully with email: {email}");
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            logger.LogError($"Error creating admin user: {error.Description}");
                        }
                    }
                }

                // Ensure the "User" role exists
                var userRoleExists = await roleManager.RoleExistsAsync("User");
                if (!userRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"An error occurred while seeding the database: {ex.Message}");
            }
        }
    }
}
