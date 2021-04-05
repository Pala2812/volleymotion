export interface AnimationStep {
    elements: {
        position: { x: number, y: number };
        element: string;
    }[];
    description: string;
}