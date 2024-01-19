import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    apiId!: number;

    @Column()
    name!: string;

    @Column()
    latitude!: number;

    @Column()
    longitude!: number;

    static async createNew(name: string, apiId: number, latitude: number, longitude: number) {
        const place = new Place()
        place.name = name;
        place.apiId = apiId;
        place.latitude = latitude;
        place.longitude = longitude;

        await place.save();
        return place;
    }
}