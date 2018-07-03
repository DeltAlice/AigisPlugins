import { Unit, ResourceStore} from './gameData.service'


export class GeneratePlan {
    
    eatLittleBlessing(unit:Unit, resStore:ResourceStore) {
        let suc = false
        let exp = 0
        if (resStore.LittleBlessing[unit.Rare.ID] > 0) {
            resStore.LittleBlessing[unit.Rare.ID] -= 1
            switch (unit.Rare.ID) {
                case '银': exp = 3000; break
                case '金': exp = 18000; break
                case '白': exp = 19000; break
                case '黑': exp = 20000; break
                case '蓝': exp = 19000; break
                default: break
            }
            exp*=resStore.GlobalExpMult
            suc=true
        }
        unit.expUp(exp)
        return suc
    }
    eatPackage(unit:Unit, resStore:ResourceStore, kind = 'Bucket') {
        let suc =false
        let exp = 0
        if (resStore.RareSpirit[unit.Rare.ID] >= 3 && resStore[kind] > 0) {
            resStore.LittleBlessing[unit.Rare.ID] -= 3
            resStore[kind] -= 1
            exp = kind == 'Bucket' ? 8000 : 40000
            exp*=resStore.GlobalExpMult
            suc=true
        }
        return suc
    }
    eatIridescence(unit:Unit, resStore:ResourceStore) {
        let suc = false
        let cost = 0
        const upSkillChance = {
            '3': [1, 0.25],
            '5': [1, 0.75, 0.5, 0.25],
            '10': [1, 0.75, 0.75, 0.75, 0.75, 0.5, 0.5, 0.5, 0.25],
            '16': [1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25]
        }
        if (unit.Skill.SkillLevel != unit.Skill.MaxSkillLevel) {
            upSkillChance[unit.Skill.MaxSkillLevel].slice(unit.Skill.SkillLevel - 1, unit.Skill.MaxSkillLevel).forEach(c => cost += 1 / c)
            if (resStore.Iridescence >= cost) {
                resStore.Iridescence -= cost
                suc = true
            }
        }
        else {
            suc = true
        }
        return suc
    }
}