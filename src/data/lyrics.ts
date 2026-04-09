// ============================================================================
// LYRICS DATA — Virgoun - Selamat Tinggal Reff
// Maps X-position in the game world to lyric text
// ============================================================================

export interface LyricEntry {
    start: number;  // X-coordinate where lyric appears
    text: string;
}

export const LYRICS_DATA: LyricEntry[] = [
    { start: 1000, text: "Andai dulu kau tak pergi dari hidupku..." },
    { start: 3500, text: "Takkan mungkin kutemui cinta yang kini kumiliki" },
    { start: 6000, text: "Cinta yang menerima kekurangan" },
    { start: 8500, text: "Dan merubah caraku memandang dunia" },
    { start: 11000, text: "Andai dulu kupaksakan t'rus bersamamu" },
    { start: 13500, text: "Belum tentu kisah kita berdua berakhir bahagia" },
    { start: 16000, text: "Kisah yang mendewasakan kita berdua" },
    { start: 18500, text: "Meski lewat luka..." },
    { start: 21000, text: "Satu hal yang kini aku mengerti" },
    { start: 23500, text: "Meski berat bibir ini mengucap" },
    { start: 26000, text: "Akan s'lalu ada kata selamat" },
    { start: 28500, text: "Dalam setiap kata s'lamat tinggal..." },
    { start: 31000, text: "Di tempat ini..." },
    { start: 33500, text: "Di tempat pertama aku menemukanmu." },
];

// Photo assets for in-game polaroids and end gallery
export const PHOTO_ASSETS: string[] = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
    "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=600",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600",
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600",
];
