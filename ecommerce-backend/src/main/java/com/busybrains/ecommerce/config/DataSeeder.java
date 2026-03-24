package com.busybrains.ecommerce.config;

import com.busybrains.ecommerce.models.ERole;
import com.busybrains.ecommerce.models.Product;
import com.busybrains.ecommerce.models.User;
import com.busybrains.ecommerce.repositories.ProductRepository;
import com.busybrains.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByUsername("Sanju")) {
            User admin = new User("Sanju", "rishi.rockstar2003@gmail.com", encoder.encode("1234567888"));
            admin.setRole(ERole.ROLE_ADMIN);
            admin.setFullName("Sanju");
            admin.setPhoneNumber("7036652992");
            userRepository.save(admin);
        }

        if (!userRepository.existsByUsername("user")) {
            User user = new User("user", "user@busybrains.com", encoder.encode("password"));
            user.setRole(ERole.ROLE_USER);
            userRepository.save(user);
        }

        // Seed exactly 70 products (10 per category)
        if (productRepository.count() < 50) {
            productRepository.deleteAll(); // clear old format products if any
            productRepository.saveAll(List.of(
                    // Electronics
                    new Product("Galaxy S24 Ultra", "Smartphone 256GB, 200MP camera", new BigDecimal("1299.99"), "Electronics"),
                    new Product("iPhone 15 Pro Max", "Smartphone 512GB, A17 Pro chip", new BigDecimal("1199.99"), "Electronics"),
                    new Product("Sony WH-1000XM5", "Wireless noise canceling headphones", new BigDecimal("398.00"), "Electronics"),
                    new Product("MacBook Pro 16", "M3 Max, 36GB RAM, 1TB SSD", new BigDecimal("3499.00"), "Electronics"),
                    new Product("iPad Air", "10.9-inch display, M1 chip", new BigDecimal("599.00"), "Electronics"),
                    new Product("Kindle Paperwhite", "8GB, 6.8-inch display", new BigDecimal("139.99"), "Electronics"),
                    new Product("LG C3 OLED 65\"", "4K Smart TV, 120Hz refresh", new BigDecimal("1599.99"), "Electronics"),
                    new Product("Nintendo Switch OLED", "Handheld gaming console", new BigDecimal("349.99"), "Electronics"),
                    new Product("Bose SoundLink Flex", "Waterproof Bluetooth speaker", new BigDecimal("149.00"), "Electronics"),
                    new Product("Logitech MX Master 3S", "Wireless ergonomic mouse", new BigDecimal("99.99"), "Electronics"),
                    
                    // Fashion
                    new Product("Men's Classic T-Shirt", "100% Cotton, Crewneck, Short Sleeve", new BigDecimal("19.99"), "Fashion"),
                    new Product("Women's Running Shoes", "Lightweight athletic sneakers", new BigDecimal("59.99"), "Fashion"),
                    new Product("Leather Crossbody Bag", "Genuine leather, adjustable strap", new BigDecimal("89.50"), "Fashion"),
                    new Product("Levi's 501 Original", "Classic straight fit denim jeans", new BigDecimal("69.50"), "Fashion"),
                    new Product("Ray-Ban Aviators", "Classic polarized sunglasses", new BigDecimal("165.00"), "Fashion"),
                    new Product("Casio G-Shock", "Digital sports watch, water resistant", new BigDecimal("99.00"), "Fashion"),
                    new Product("Cashmere Sweater", "Soft 100% cashmere pullover", new BigDecimal("140.00"), "Fashion"),
                    new Product("Nike Air Force 1", "Classic lifestyle sneakers", new BigDecimal("115.00"), "Fashion"),
                    new Product("Fossil Leather Wallet", "Men's bifold with RFID blocking", new BigDecimal("45.00"), "Fashion"),
                    new Product("Silk Scarf", "100% Mulberry silk printed scarf", new BigDecimal("35.00"), "Fashion"),

                    // Home & Kitchen
                    new Product("Ninja Air Fryer", "4-Quart Capacity, Programmable Base", new BigDecimal("99.99"), "Home & Kitchen"),
                    new Product("Robot Vacuum Cleaner", "Wi-Fi Connected, Self-Charging", new BigDecimal("249.99"), "Home & Kitchen"),
                    new Product("Ceramic Pan Set", "12-Piece Pots and Pans Set", new BigDecimal("149.99"), "Home & Kitchen"),
                    new Product("Nespresso Vertuo", "Coffee and Espresso Maker by De'Longhi", new BigDecimal("175.00"), "Home & Kitchen"),
                    new Product("Vitamix Blender", "Professional-grade, 64 oz container", new BigDecimal("349.99"), "Home & Kitchen"),
                    new Product("Dyson V15 Detect", "Cordless stick vacuum cleaner", new BigDecimal("749.00"), "Home & Kitchen"),
                    new Product("Microfiber Sheets", "Queen size luxury bed sheets set", new BigDecimal("35.00"), "Home & Kitchen"),
                    new Product("Instant Pot Duo", "7-in-1 Electric Pressure Cooker", new BigDecimal("89.99"), "Home & Kitchen"),
                    new Product("Keurig K-Mini", "Single Serve Coffee Maker", new BigDecimal("79.99"), "Home & Kitchen"),
                    new Product("KitchenAid Mixer", "Artisan Series 5-Qt. Stand Mixer", new BigDecimal("449.99"), "Home & Kitchen"),

                    // Books
                    new Product("The Midnight Library", "Fiction Novel by Matt Haig", new BigDecimal("14.50"), "Books"),
                    new Product("Atomic Habits", "Self-Help Book by James Clear", new BigDecimal("11.98"), "Books"),
                    new Product("Dune", "Science fiction novel by Frank Herbert", new BigDecimal("10.99"), "Books"),
                    new Product("Project Hail Mary", "Sci-fi novel by Andy Weir", new BigDecimal("14.99"), "Books"),
                    new Product("Tomorrow, and Tomorrow", "Novel by Gabrielle Zevin", new BigDecimal("16.00"), "Books"),
                    new Product("To Kill a Mockingbird", "Classic novel by Harper Lee", new BigDecimal("8.99"), "Books"),
                    new Product("Harry Potter Set", "Complete 7-Book Collection Series", new BigDecimal("55.00"), "Books"),
                    new Product("1984", "Dystopian fiction by George Orwell", new BigDecimal("9.99"), "Books"),
                    new Product("Thinking, Fast and Slow", "Psychology book by Daniel Kahneman", new BigDecimal("13.50"), "Books"),
                    new Product("Sapiens", "A Brief History of Humankind by Yuval Harari", new BigDecimal("15.50"), "Books"),
                    
                    // Sports
                    new Product("Yoga Mat", "Extra Thick High Density Exercise Mat", new BigDecimal("24.99"), "Sports"),
                    new Product("Adjustable Dumbbells", "Set of 2, 5-52.5 lbs fast adjustment", new BigDecimal("199.00"), "Sports"),
                    new Product("Spalding Basketball", "NBA Official Size and Weight", new BigDecimal("39.99"), "Sports"),
                    new Product("Tennis Racket", "Lightweight aluminum adult racket", new BigDecimal("45.00"), "Sports"),
                    new Product("Cycling Helmet", "Breathable impact-resistant road helmet", new BigDecimal("55.00"), "Sports"),
                    new Product("Resistance Bands", "Set of 5 workout stretch bands", new BigDecimal("15.99"), "Sports"),
                    new Product("Hydro Flask 32oz", "Stainless steel reusable water bottle", new BigDecimal("44.95"), "Sports"),
                    new Product("Jump Rope", "Tangle-free speed jump rope", new BigDecimal("12.50"), "Sports"),
                    new Product("Camping Tent", "4-person weatherproof pop-up tent", new BigDecimal("115.00"), "Sports"),
                    new Product("Golf Balls (Dozen)", "Tour-grade urethane cover golf balls", new BigDecimal("29.99"), "Sports"),

                    // Beauty
                    new Product("Vitamin C Serum", "Anti-Aging Face Serum with Hyaluronic Acid", new BigDecimal("21.99"), "Beauty"),
                    new Product("Hydrating Cleanser", "Daily Face Wash for Normal to Dry Skin", new BigDecimal("15.50"), "Beauty"),
                    new Product("Moisturizing Cream", "Body and face lotion for sensitive skin", new BigDecimal("18.00"), "Beauty"),
                    new Product("Sunscreen SPF 50", "Broad spectrum facial sunscreen", new BigDecimal("24.50"), "Beauty"),
                    new Product("Eyeshadow Palette", "16 highly pigmented matte & shimmer shades", new BigDecimal("35.00"), "Beauty"),
                    new Product("Liquid Eyeliner", "Waterproof and smudge-proof formula", new BigDecimal("12.99"), "Beauty"),
                    new Product("Matte Lipstick", "Long-lasting vivid lip color", new BigDecimal("14.00"), "Beauty"),
                    new Product("Hair Dryer", "Ionic conditioning professional blow dryer", new BigDecimal("45.00"), "Beauty"),
                    new Product("Makeup Brush Set", "14 piece synthetic premium brushes", new BigDecimal("22.50"), "Beauty"),
                    new Product("Exfoliating Scrub", "Brown sugar and coconut oil body scrub", new BigDecimal("16.00"), "Beauty"),

                    // Toys & Games
                    new Product("LEGO Star Wars", "Millennium Falcon Building Kit", new BigDecimal("159.99"), "Toys & Games"),
                    new Product("Board Game - Catan", "Strategy Board Game for Family", new BigDecimal("44.00"), "Toys & Games"),
                    new Product("Monopoly Classic", "Property trading board game", new BigDecimal("19.99"), "Toys & Games"),
                    new Product("Uno Card Game", "Classic color & number matching card game", new BigDecimal("6.50"), "Toys & Games"),
                    new Product("Hot Wheels 20-Pack", "Die-cast 1:64 scale vehicle collection", new BigDecimal("22.00"), "Toys & Games"),
                    new Product("Barbie Dreamhouse", "3-story dollhouse with pool and slide", new BigDecimal("199.99"), "Toys & Games"),
                    new Product("Play-Doh Multi-Pack", "10 cans of modeling compound", new BigDecimal("14.99"), "Toys & Games"),
                    new Product("Rubik's Cube", "The original 3x3 color-matching puzzle", new BigDecimal("11.50"), "Toys & Games"),
                    new Product("Nerf Blaster", "High capacity mechanized dart blaster", new BigDecimal("35.00"), "Toys & Games"),
                    new Product("Jenga Classic", "Hardwood block balancing game", new BigDecimal("15.00"), "Toys & Games")
            ));
        }
    }
}
