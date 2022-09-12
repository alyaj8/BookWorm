import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView,Button } from 'react-native';

export default function book() {
  return (
    <ScrollView>
    <View style={{paddingTop:70, alignItems:"center", }}>
     
      <View style={{backgroundColor:'lightgray', alignItems:"center" ,height:212, width:143 , justifyContent:"center",}}>
      <Text style={{height:20}}>book Poster here</Text>
      </View>
      <View style={{ borderRadius:25 , height:560,}}>
      <View style={{padding:10, justifyContent:"center", alignItems:"center"}}>
      <Text style={{flew:1,alignItems:"center",justifyContent:"center", paddingTop:20,paddingLeft:10 ,paddingRight:10}}>Who Moved My Cheese? </Text>
    <Text > by Spencer Johnson</Text>
    <Text > _________________________________________________________</Text>
    <Text style={{ paddingTop:10,paddingLeft:10 ,paddingRight:10}}>Review: </Text>
    <Text style={{paddingLeft:10 ,paddingRight:10}}> _________________________________________________________</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> Your review of the book:</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> leave your comments and read other’s:</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> _________________________________________________________</Text>
        <Text style={{alignItems:"center",justifyContent:"center", paddingTop:20,paddingLeft:10 ,paddingRight:10}}>Description:</Text>
        <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}>
                An Amazing Way to Deal with Change in Your Work and in Your Life, 
                published on September 8, 1998, is a bestselling seminal work and 
                motivational business fable by Spencer Johnson. The text describes 
                the way one reacts to major change in one's work and life, and four 
                typical reactions to those changes by two mice and two "Littlepeople", 
                during their hunt for "cheese".
        </Text><Text style={{paddingTop:20,paddingLeft:10 ,paddingRight:10}}>ISBN: 9780399144462</Text>
        <View style={styles.fixToText}>
            <Button title="Add to:" color="lightgrey" />
       </View>
       <View style={styles.fixToText}> 
            <Button title="Buy now" color="lightgrey" />
       </View>
      </View>
        <StatusBar style="auto" />
      </View>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixToText: {
    marginTop: 12,
    width: 280,
    justifyContent: 'center',
    alignContent:"center"
}
});
