import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendModel } from '../models/FriendModel';
import { MessageModel } from '../models/MessageModel';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  /**
   * Emits url of first image to display in left and top header component
   */
  @Output() imageUrl : EventEmitter<string> = new EventEmitter();
  /**
   * Constant for text type of messages
   */
  TEXT_TYPE : string = "TEXT";
  /**
   * Constant for image type of messages
   */
  IMAGE_TYPE : string = "IMAGE";

  /**
   * List of all friends with there last message
   */
  friendsList : Array<FriendModel> = [];
  /**
   * List of message of selected friend.
   * By default I am displaying same message for all friends selection.
   */
  messageMap : Map<string,Array<MessageModel>> = new Map();
  /**
   * List of all message keys
   */
  messageKeys : Array<string> = [];
  /**
   * Friend index selected
   */
  friendIndexSelected : number;
  /**
   * Image url of friend whose chat is displayed
   */
  friendImage : string;
  /**
   * Checks whether add button is displayed or close
   */
  isCloseButtonDisplayed : boolean;
  /**
   * Add Item selected
   */
  selectedAddItem : number;

  constructor(
    private httpClient : HttpClient
  ) { }

  ngOnInit() {
    this.getFriendMessages();
    this.getChat();

  }

  /**
   * Friend list is fetched 
   */
  getFriendMessages(){
    let api : string = "https://frontend-api.s3.ap-south-1.amazonaws.com/friends.json";
    this.httpClient.get(api).subscribe((data : any) => {
      if(data && data.success) {
        this.friendsList = data.data.friends;
        if(this.friendsList && this.friendsList[1])
        this.imageUrl.emit(this.friendsList[1].thumbnail);
        this.friendSelected(0);
      }
    })
  }

  /**
   * Chats are fetched
   */
  getChat(){
    let api : string = "https://frontend-api.s3.ap-south-1.amazonaws.com/messages.json";
    this.httpClient.get(api).subscribe((data : any) => {
      if(data && data.success) {
        this.messageMap = new Map();
        this.messageKeys = [];
        if(data.data && data.data.chat) {
          data.data.chat.forEach(chat => {
            let messageList : Array<MessageModel> = [];
            if(chat.messages && chat.messages.length) {
              chat.messages.forEach(messageType => {
                let messageModel : MessageModel = new MessageModel();
                messageModel = messageType.data;
                messageModel.type = messageType.type;
                messageList.push(messageModel);
              });
            }
            this.messageMap.set(chat.dateBreak,messageList);
          });
          this.messageKeys = Array.from(this.messageMap.keys());
        }
      }
    })
  }

  /**
   * Friend from list of friends is selected
   * @param friendIndex Index of friend selected
   */
  friendSelected(friendIndex : number) {
    this.friendIndexSelected = friendIndex;
    this.friendImage = this.friendsList[this.friendIndexSelected].thumbnail;
  }

  /**
   * Checks whether add button is displayed or not
   */
  closeButtonNav() {
    this.isCloseButtonDisplayed = !this.isCloseButtonDisplayed;
    if(this.isCloseButtonDisplayed) {
      this.selectedAddItem = 2;
    }
  }

  /**
   * Select item from list of add items
   * @param index Index selected
   */
  selectItem(index) {
    this.selectedAddItem = index;
  }

}
