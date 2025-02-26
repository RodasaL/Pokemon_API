export declare class FetchpokemonService {
    Func2(): {
        message: string;
    };
    getPokemon(name: string): Promise<{
        name: any;
        id: any;
        weight: any;
        height: any;
        color1: string;
        color2: string;
        stats: {
            hp: any;
            attack: any;
            defense: any;
            specialAttack: any;
            specialDefense: any;
            speed: any;
        };
        types: any;
        sprites: {
            front: any;
            back: any;
        };
    }>;
    rgbToHex({ red, green, blue }: {
        red: any;
        green: any;
        blue: any;
    }): string;
}
