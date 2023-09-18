import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from "react-native";
import { style as styles } from "./style";
import { useState } from "react";

export default function App() {
  const [listTodo, setListTodo] = useState([]);
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const onChangeTask = (value) => {
    setTask(value);
  };

  const onPress = () => {
    if (task !== "") {
      setListTodo((prev) => [
        ...prev,
        {
          id: listTodo.length + 1,
          content: task,
        },
      ]);
      setTask("");
      Keyboard.dismiss();
    }
    // Alert.alert("Alert Title", "My Alert Msg", [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   { text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
  };

  const handleDelete = () => {
    const filterArr = listTodo.filter((item) => item.id !== itemSelected.id);

    for (i = itemSelected.id - 1; i < filterArr.length; i++) {
      filterArr[i].id -= 1;
    }
    setListTodo(filterArr);
    setModalVisible(false);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>Deleting this Todo Lists?</Text>
            <View style={styles.boxModal}>
              <TouchableOpacity
                style={styles.boxBottomRightButton}
                onPress={() => handleDelete(itemSelected)}
              >
                <Text style={styles.textBtnModal}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.boxBottomRightButton}
                onPress={() => handleCloseModal()}
              >
                <Text style={styles.textBtnModal}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.boxBody}>
        <Text style={styles.textTitle}>Todo List</Text>
        <ScrollView style={styles.boxBodyScrollView}>
          <View style={styles.boxListTodo}>
            {listTodo.length > 0 ? (
              listTodo?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`${item.id}-${index}`}
                    onPress={() => {
                      setModalVisible(true);
                      setItemSelected(item);
                    }}
                  >
                    <View style={styles.boxDetailTodo}>
                      <View style={styles.boxDetailTodoLeft}>
                        <View
                          style={[
                            styles.boxDetailTodoLeftTitle,
                            item.id % 2 === 0
                              ? styles.boxColorLeft1
                              : styles.boxColorLeft2,
                          ]}
                        >
                          <Text style={styles.listTile}>0{item.id}</Text>
                        </View>
                      </View>
                      <View style={styles.boxDetailTodoRight}>
                        <Text style={styles.boxDetailTodoRightTitle}>
                          {item.content}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>No Todo List</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        style={styles.boxBottom}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <View style={styles.boxBottomLeft}>
          <TextInput
            style={styles.boxBottomLeftInput}
            placeholder="Your task"
            value={task}
            onChangeText={(value) => onChangeTask(value)}
          />
        </View>
        <TouchableOpacity>
          <View style={styles.boxBottomRight}>
            <Pressable style={styles.boxBottomRightButton} onPress={onPress}>
              <Text style={styles.text}>Submit</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
