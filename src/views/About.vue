<template>
  <div class="about">
    <h1>Teraz {{ isInterviewer ? 'ROBÍŠ POHOVOR' : 'SI NA POHOVORE' }}, ťah: {{ playerData.iteration }} </h1>

    <!--<p>Pairing output: {{ returnHand(playerData) }}</p>-->

    <h2>Pre:</h2>

    <div style="display: inline-block; justify-content: center;">
      <card :name="shuffledJobDeck[cleanIteration(playerData.iteration)]" :type="true" />
    </div>
    
    <div v-if="!isInterviewer">
      <h2>Máš tieto kvality</h2>

      <div>
        <div style="display: inline-block; justify-content: center;" v-for="idx in returnHand(playerData)" :key="idx">
          <card :name="shuffledQuaDeck[idx]" :type="false" />
        </div>
      </div>
    </div>

    <div>
      <button v-if="playerData.iteration > 0" @click="decrement">Zobraz predoslý ťah</button>
      <button @click="increment">Pokračovať do ďaľšieho ťahu</button>
    </div>    
  </div>
</template>

<script lang="ts">
import cards from '../gamerules/cards.json'
import { reactive, onMounted, defineComponent, computed } from 'vue';
import seedrandom from 'seedrandom'
import _ from 'lodash'
import card from '../components/card.vue'

type Player = {seed: string, player: number, iteration: number, count: number}

function pairingFunc(i: number, j: number) {
    return 1/2 * (i + j) * (i + j + 1) + i
}

function determineCard(player: Player, hand: number, mod: number) {
  return pairingFunc(pairingFunc(pairingFunc(player.player, player.count), hand), player.iteration) % mod
}

function returnHand(player: Player) {
  const res: Array<number> = []
  let hand = 0

  while (res.length != 4) {
    const it = determineCard(player, hand, cards.qualification.length)
    if (res.indexOf(it) == -1) {
      res.push(it)
    }
    hand += 1
  }
  return res
}

export default defineComponent({
  components: {
    card
  },
  setup() {
    const playerData: Player = reactive({
      seed: '123456',
      player: 0,
      iteration: 0,
      count: 1
    })

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);

      playerData.seed = urlParams.get('seed') || '123456'
      playerData.player = Number(urlParams.get('player'))
      playerData.iteration = Number(urlParams.get('iteration'))
      playerData.count = Number(urlParams.get('count'))
    })

    const isInterviewer = computed(() => {
      seedrandom(playerData.seed+String(playerData.iteration), {global: true})
      const { random } = _.runInContext()

      return playerData.player == random(playerData.count || 1)-1
    })

    const shuffledJobDeck = computed(() => {
      seedrandom(playerData.seed, {global: true})
      const { sampleSize } = _.runInContext()

      return sampleSize(cards.job, cards.job.length)
    })
  
    const shuffledQuaDeck = computed(() => {
      seedrandom(playerData.seed, {global: true})
      const { sampleSize } = _.runInContext()

      return sampleSize(cards.qualification, cards.qualification.length)
    })

    return { playerData, isInterviewer, shuffledQuaDeck, shuffledJobDeck }
  },


  methods: {
    returnHand,
    decrement() {
      this.playerData.iteration -= 1
    },
    increment() {
      this.playerData.iteration += 1
    },
    cleanIteration(idx: number) {
      return idx % cards.job.length
    }
  }
})
</script>

<style scoped>
</style>