class FiltersModel {
    all: boolean;
    active: boolean;
    future: boolean;
    followed: boolean;

    constructor(all: boolean, active: boolean, future: boolean, followed: boolean) {
        this.all = all;
        this.active = active;
        this.future = future;
        this.followed = followed;
    }
}

export default FiltersModel;