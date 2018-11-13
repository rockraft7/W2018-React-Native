import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import CommonStyles from "../../helpers/common-styles";
import WrapperComponent from "../../components/Wrapper.component";
import Avatar from "../../components/Avatar";
import EventsCarousel from "../../components/home/EventsCarousel";
import EventCard from "../..//components/EventCard";

const featuredEvents = [
  {
    id: 1, isPrivate: false, isUpcoming: false
  },
  {
    id: 2, isPrivate: true, isUpcoming: false
  },
  {
    id: 3, isPrivate: true, isUpcoming: false
  },
  {
    id: 4, isPrivate: false, isUpcoming: false
  },
  {
    id: 5, isPrivate: true, isUpcoming: false
  }
];

const upcomingEvents = [
  {
    id: 1, isPrivate: false, isUpcoming: true
  },
  {
    id: 2, isPrivate: true, isUpcoming: true
  },
  {
    id: 3, isPrivate: true, isUpcoming: true
  },
  {
    id: 4, isPrivate: false, isUpcoming: true
  },
  {
    id: 5, isPrivate: true, isUpcoming: true
  }
];

class Home extends Component {
  render() {
    return (
      <WrapperComponent>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this._renderHeader()}
          <EventsCarousel events={featuredEvents} />
          {this._renderUpcomingEvents(upcomingEvents)}
        </ScrollView>
      </WrapperComponent>
    );
  }

  _renderHeader = () => (
    <View style={CommonStyles.header}>
      <Text style={CommonStyles.title}>Featured Events</Text>
      <Avatar user={{
        firstName: "Khoa",
        lastName: "Tran"
      }} />
    </View>
  );

  _renderUpcomingEvents = (events) => (
    <View style={{ 
      flex: 1, 
      backgroundColor: "#F1F3F5", 
      marginTop: 20, 
      paddingTop: 20,
      paddingBottom: 20 }}>
      <Text style={[CommonStyles.title, { color: "#3C5063" }]}>Upcoming Events</Text>
      <View style={{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 25
      }}>
      {
        events.map((item, index) => (
          <TouchableOpacity key={index} style={{
            marginBottom: 20
          }}>
            <EventCard event={item} />
          </TouchableOpacity>
        ))
      }
      </View>
    </View>
  );
}

export default connect(
  null,
  null
)(Home);
