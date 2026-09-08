import { v4 as uuiv4 } from 'uuid'

export interface FarmProps {
    id?: string;
    farmerId: string;
    name: string;
    city: string;
    state: string;
    totalAreaHa: number;
    totalArableAreaHa: number;
    totalVegetationAreaHa: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Farm {
    private readonly id: string;
    private readonly farmerId: string;
    private name: string;
    private city: string;
    private state: string;
    private totalAreaHa: number;
    private totalArableAreaHa: number;
    private totalVegetationAreaHa: number;
    private readonly createdAt: Date;
    private updatedAt: Date;

    private constructor(props: FarmProps) {
        this.validateAreas(
            props.totalAreaHa,
            props.totalArableAreaHa,
            props.totalVegetationAreaHa,
        );

        this.id = props.id ?? uuiv4();
        this.farmerId = props.farmerId;
        this.name = props.name;
        this.city = props.city;
        this.state = props.state.toUpperCase().trim();
        this.totalAreaHa = props.totalAreaHa;
        this.totalArableAreaHa = props.totalArableAreaHa;
        this.totalVegetationAreaHa = props.totalVegetationAreaHa;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }

    public static create(
        props: Omit<FarmProps, 'id' | 'createdAt' | 'updatedAt'>,
    ): Farm {
        return new Farm(props);
    }

    public static restore(props: Required<FarmProps>): Farm {
        return new Farm(props);
    }

    private validateAreas(
        total: number,
        arable: number,
        vegetation: number,
    ): void {
        if (arable + vegetation > total) {
            throw new Error(
                'The sum of arable area and vegetation area cannot exceed the total farm area.',
            );
        }
    }

    public getId(): string {
        return this.id;
    }

    public getFarmerId(): string {
        return this.farmerId;
    }

    public getName(): string {
        return this.name;
    }

    public getCity(): string {
        return this.city;
    }

    public getState(): string {
        return this.state;
    }

    public getTotalAreaHa(): number {
        return this.totalAreaHa;
    }

    public getTotalArableAreaHa(): number {
        return this.totalArableAreaHa;
    }

    public getTotalVegetationAreaHa(): number {
        return this.totalVegetationAreaHa;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}