CREATE TABLE manhwa (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    genre NVARCHAR(100),
    description NVARCHAR(MAX),
    image_url NVARCHAR(2083)
);
INSERT INTO manhwa (title, genre, description, image_url)
VALUES 
('Solo Leveling', 'Action, Fantasy', 'A hunter becomes stronger as he fights through dungeons and monsters.', 'https://<your-blob-storage>/solo-leveling.jpg'),
('Tower of God', 'Adventure, Fantasy', 'A boy climbs a mysterious tower to find his best friend and discovers dangerous secrets.', 'https://<your-blob-storage>/tower-of-god.jpg'),
('Vivy: Fluorite Eye’s Song', 'Sci-Fi, Music', 'An AI with a mission to prevent the future destruction of humanity sings and fights her way through challenges across time.', 'https://<your-blob-storage>/vivy-fluorite-eye.jpg');