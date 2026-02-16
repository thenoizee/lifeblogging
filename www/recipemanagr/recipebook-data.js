export const recipes = [
    {
        name: "Chicken Curry",
        description: "A flavorful and aromatic chicken curry that's better than takeout.",
        cuisine: "Indian",
        ingredients: [
            {
                section: "Chicken Marinade",
                items: [
                    { text: "1 whole chicken w/ bones, chopped into pieces" },
                    { text: "150g natural yogurt" },
                    { text: "2-3 garlic cloves AND 1 inch ginger grated (OR 1tbsp garlic ginger paste)", tip: "Using fresh paste is key!" },
                    { text: "1 tsp salt" },
                    { text: "1 tsp turmeric" },
                    { text: "1 tsp garam masala" }
                ]
            },
            {
                section: "Sauce",
                items: [
                    { text: "2-3 tbsp oil" },
                    { text: "1 tbsp cumin seed" },
                    { text: "3 med onion" },
                    { text: "4 tomatoes roughly chop (or 400gm canned diced tomatoes)" },
                    { text: "1/2 tsp salt" },
                    { text: "1/2 tsp turmeric" },
                    { text: "1 tbsp garam masala" }
                ]
            }
        ],
        instructions: [
            {
                section: "Marinade",
                items: [{ text: "Combine ingredients together and marinade at least 20 minutes, but preferably overnight" }]
            },
            {
                section: "Sauce",
                items: [
                    { text: "heat 2-3 tbsp oil" },
                    { text: "roughly chop 3 med onion" },
                    { text: "add 1 tbsp cumin seed and onions" },
                    { text: "cook until golden brown", tip: "Be patient, this develops flavor." },
                    { text: "add 2 garlic cloves grated and 1 inch ginger grated OR equivalent" },
                    { text: "mix & cook 2 minutes" },
                    { text: "add 4 tomatoes roughly chop (or 400gm canned diced tomatoes)" },
                    { text: "add 2tbsp tomato puree" },
                    { text: "cover cook on low heat 15-20 minutes" }
                ]
            }
        ],
        prepTime: 30,
        cookTime: 45,
        totalTime: 75,
        yield: {
            quantity: 4,
            unit: 'regular portions'
        },
        rating: 5,
        sourceName: "Chetna Makan",
        sourceUrl: "https://www.youtube.com/watch?v=ACztoZgLngI",
        labels: ["curry", "dinner", "weekend"],
        notes: "Garnish with fresh coriander before serving. Can be served with rice or naan bread.",
        imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c7373058?q=80&w=1770&auto=format&fit=crop",
        discoveredDate: "2022-10-15",
        mealType: "Dinner",
        category: "Food",
        history: [
            {
                date: "2024-03-15T19:00",
                rating: 5,
                notes: "Made this for guests, it was a huge hit! Added a little extra chili for more heat.",
                imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c7373058?q=80&w=1770&auto=format&fit=crop"
            }
        ]
    }
];