import regions from "./regions.json"

const regionsMap = {};
for (const region of regions) {
    regionsMap[region.id] = region.name;
}

export const getRegions = () => regions;
export const getRegionByID = (id) => regionsMap[id];
