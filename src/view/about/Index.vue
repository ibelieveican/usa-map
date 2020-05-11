<template>
  <div class="about-box">
    <MapHeader></MapHeader>
    <div class="about-content">
      <p>
        A current priority of the states is a decision on either reopening the economy or extending the quarantine, and people’s opinions on the matter are vastly divided and evolving. This website tracks Americans’ perception of reopening at the national and state levels. The project, initiated and conducted by Dr. Qingbin Cui’s research team at the University of Maryland, relies on Twitter data retrieved daily from Twitter’s search API. Keywords such as “open up”, “reopen”, and “lockdown” were used to retrieve the relevant tweets and the user locations. A sentiment analysis was performed using the Bayesian approach, whereby each tweet is classified into one of three groups: supporting reopening, neutral, or opposing reopening. Over 2,000 tweets were manually classified based on sentiment and used as the training set in the Bayesian model, which is empirically more accurate than recurrent neural networks, logistic regression, and common sentiment analysis methods such as VADER. The Bayesian algorithm classifies over 50,000 tweets per day and has been continuously improved with additional training data. As such, the model achieved 70% accuracy against manually-labeled sentiment values.
      </p>
      <p>
        The one-person-one-vote principle was followed, and to be representative of the overall opinion of each state, a random sample of users was selected based on the state’s population, 95% level of confidence, and 3% margin of error to calculate the daily perception on reopening. A five-day moving average was taken to “retain the memory” and avoid drastic changes of opinion in a short period.
      </p>
      <img src="../../assets/img/about-img.jpg" alt="">
      <p>
        Moreover, each state’s reopening status – lockdown, partial reopen, and reopening – is constantly monitored, where reopening means close-contact businesses are allowed to operate, perhaps at a limited capacity. The expiration dates of state-level stay-at-home orders are also updated. The data are extracted from state governments’ official websites and cross-referenced with the reporting of various news outlets.
      </p>
      <p>
        Compared to polls, this tool represents a larger sample size and a timely measure of the percentage of the population supporting reopening.
      </p>
    </div>
  </div>
</template>

<script>
import MapHeader from '@components/MapHeader'

export default {
  name: 'About',
  components: {
    MapHeader
  }
}
</script>

<style lang="less" scoped>
  .about-box{
    .about-content{
      padding: 20px;
      p{
        + p{
          margin-top: 20px;
        }
      }
      img{
        display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
        padding-top: 30px;
        padding-bottom: 30px;
        + p{
          margin-top: 20px;
        }
      }
    }
  }
</style>