#import "RnAuth.h"
#import <AuthenticationServices/AuthenticationServices.h>

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RnAuth ()<ASWebAuthenticationPresentationContextProviding>

@property (strong, nonatomic) NSUserDefaults *localStorage;

@end

@implementation RnAuth

RCT_EXPORT_MODULE(NativeRnAuth)

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}
- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}
- (void)setItem:(NSString *)key value:(NSString *)value {
  [self.localStorage setObject:value forKey:key];
}
- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}
- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

- (void)login:(NSString *)url  {
  NSURL *authURL = [NSURL URLWithString:url];
  NSString *scheme = @"xterio-rn";
  
  ASWebAuthenticationSession *session = [[ASWebAuthenticationSession alloc] initWithURL:authURL
                                                                 callbackURLScheme:scheme
                                                                      completionHandler:^(NSURL *callbackURL, NSError *error) {
    if (error != nil) {
      NSLog(@"[XterioAuth] Open url error");
    }else{
      NSLog(@"[XterioAuth] Authenticated successfully: %@ %@", callbackURL, callbackURL.absoluteString);
    }
  }];
  session.presentationContextProvider = self;
  if(session.canStart){
    [session start];
  }else{
    NSLog(@"[XterioAuth] Can not open url");
  }

//   ASWebAuthenticationSession *authSession = [[ASWebAuthenticationSession alloc] initWithURL:authURL
//                                                                            callbackURLScheme:@"xterio-rn"
//                                                                            completionHandler:^(NSURL *callbackURL, NSError *error) {
//       if (error != nil) {
//           // 处理认证失败的情况
//         NSError *error = [NSError errorWithDomain:@"com.libeccio.xterio" code:-1 userInfo:nil];
// //        reject(@"Error", @"Open url error", error);
//       } else {
//           // 处理认证成功的情况，callbackURL 包含返回的认证信息
//           NSLog(@"Authenticated successfully: %@", callbackURL);
// //        resolve(callbackURL.absoluteString);
//       }
//   }];
//   authSession.presentationContextProvider = self;
//   if(authSession.canStart){
//     [authSession start];
//   }else{
//     //失败
//     NSError *error = [NSError errorWithDomain:@"com.libeccio.xterio" code:-1 userInfo:nil];
// //    reject(@"Error", @"Can not open url", error);
//   }
}
- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session{
  __block ASPresentationAnchor anchor;
  dispatch_sync(dispatch_get_main_queue(), ^{
    anchor = [[UIApplication sharedApplication].delegate window];
  });
  return anchor;
}

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    return result;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnAuthSpecJSI>(params);
}

@end
